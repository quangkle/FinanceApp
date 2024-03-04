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

        public CommentController(ICommmentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IList<Comment> comments = await _commentRepository.GetAllAsync();

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
            if (!await _stockRepository.StockExists(createCommentRequest.StockId ?? 0))
            {
                return BadRequest("Stock not found");
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return Unauthorized();
            }


            Comment comment = createCommentRequest.ToComment();
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