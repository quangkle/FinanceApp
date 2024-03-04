using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommmentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;

        public CommentController(ICommmentRepository commentRepository, IStockRepository stockRepository,
            UserManager<AppUser> userManager, IFMPService fMPService)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _userManager = userManager;
            _fmpService = fMPService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]CommentQueryObject queryObject)
        {
            IList<Comment> comments = await _commentRepository.GetAllAsync(queryObject);

            var commentsResponse = comments.Select(s => s.ToCommentResponse());

            return Ok(commentsResponse);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Comment? comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentResponse());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentRequest createCommentRequest)
        {
            var stock = await _stockRepository.GetBySymbolAsync(createCommentRequest.FormattedSymbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(createCommentRequest.FormattedSymbol);
                
                if (stock == null) {
                    return BadRequest("Stock not exists");
                }
                else 
                {
                    await _stockRepository.CreateAsync(stock);
                }
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return Unauthorized();
            }


            Comment comment = createCommentRequest.ToComment(stock.Id);
            comment.AppUserId = appUser.Id;
            var newComment = await _commentRepository.CreateAsync(comment);

            return Ok(newComment.ToCommentResponse());
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateCommentRequest createCommentRequest)
        {
            var updatedComment = await _commentRepository.UpdateAsync(id, createCommentRequest.ToComment());

            if (updatedComment == null)
            {
                return NotFound();
            }
            return Ok(updatedComment.ToCommentResponse());
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Comment? comment = await _commentRepository.DeleteAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}