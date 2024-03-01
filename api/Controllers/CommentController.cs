using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommmentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;

        public CommentController(ICommmentRepository commentRepository, IStockRepository stockRepository)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IList<Comment> comments = await _commentRepository.GetAllAsync();

            var commentsResponse = comments.Select(s => s.ToCommentResponse());

            return Ok(commentsResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Comment? comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentResponse());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentRequest createCommentRequest)
        {
            if (!await _stockRepository.StockExists(createCommentRequest.StockId ?? 0))
            {
                return BadRequest("Stock not found");
            }

            Comment comment = createCommentRequest.ToComment();
            var newComment = await _commentRepository.CreateAsync(comment);

            return Ok(newComment.ToCommentResponse());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateCommentRequest createCommentRequest)
        {
            var updatedComment = await _commentRepository.UpdateAsync(id, createCommentRequest.ToComment());

            if (updatedComment == null)
            {
                return NotFound();
            }
            return Ok(updatedComment.ToCommentResponse());
        }

        [HttpDelete("{id}")]
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