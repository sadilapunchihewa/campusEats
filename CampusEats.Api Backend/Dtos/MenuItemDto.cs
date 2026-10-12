namespace CampusEats.Api.Dtos;

// Output DTO
public record MenuItemDto(
    int Id,
    string Name,
    decimal Price,
    string Category,
    bool Available
);