using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusEats.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _svc;

    public MenuController(IMenuService svc)
    {
        _svc = svc;
    }

    // GET: api/menu
    [HttpGet]
    public ActionResult<IEnumerable<MenuItemDto>> GetAll()
    {
        return Ok(_svc.GetAll());
    }

    // GET: api/menu/1
    [HttpGet("{id}")]
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _svc.GetById(id);

        if (item == null)
            return NotFound();

        return Ok(item);
    }

    // POST: api/menu
    [HttpPost]
    public ActionResult<MenuItemDto> Create([FromBody] CreateMenuItemDto dto)
    {
        var created = _svc.Create(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }
    // PUT: api/menu/1
[HttpPut("{id}")]
public IActionResult Update(int id, [FromBody] CreateMenuItemDto dto)
{
    var ok = _svc.Update(id, dto);
    return ok ? NoContent() : NotFound();
}

// DELETE: api/menu/1
[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    var ok = _svc.Delete(id);
    return ok ? NoContent() : NotFound();
}
}