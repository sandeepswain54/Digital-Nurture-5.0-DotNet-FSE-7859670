using Microsoft.EntityFrameworkCore;
using Lab7_LINQ;

Console.WriteLine("=== Lab 7: Writing Queries with LINQ ===");
Console.WriteLine("");

using var context = new AppDbContext();
await context.Database.EnsureCreatedAsync();

// Insert sample data
var electronics = new Category { Name = "Electronics" };
var groceries = new Category { Name = "Groceries" };
await context.Categories.AddRangeAsync(electronics, groceries);

await context.Products.AddRangeAsync(
    new Product { Name = "Laptop",      Price = 75000, Category = electronics },
    new Product { Name = "Smartphone",  Price = 25000, Category = electronics },
    new Product { Name = "Headphones",  Price = 3000,  Category = electronics },
    new Product { Name = "Rice Bag",    Price = 1200,  Category = groceries   },
    new Product { Name = "Sugar",       Price = 500,   Category = groceries   },
    new Product { Name = "Tablet",      Price = 45000, Category = electronics }
);
await context.SaveChangesAsync();
Console.WriteLine("Sample data inserted!");
Console.WriteLine("");

// Show ALL products first
Console.WriteLine("=== All Products ===");
var allProducts = await context.Products.ToListAsync();
foreach (var p in allProducts)
{
    Console.WriteLine($"Name: {p.Name} | Price: Rs.{p.Price}");
}
Console.WriteLine("");

// Step 1 - Filter with Where
Console.WriteLine("=== Step 1: Filter - Price > 1000 ===");
var filtered = await context.Products
    .Where(p => p.Price > 1000)
    .ToListAsync();
foreach (var p in filtered)
{
    Console.WriteLine($"Name: {p.Name} | Price: Rs.{p.Price}");
}
Console.WriteLine("");

// Step 1 - Sort with OrderByDescending
Console.WriteLine("=== Step 1: Sort - Price High to Low ===");
var sorted = await context.Products
    .Where(p => p.Price > 1000)
    .OrderByDescending(p => p.Price)
    .ToListAsync();
foreach (var p in sorted)
{
    Console.WriteLine($"Name: {p.Name} | Price: Rs.{p.Price}");
}
Console.WriteLine("");

// Step 2 - Project into DTO
Console.WriteLine("=== Step 2: Project into DTO ===");
var productDTOs = await context.Products
    .Select(p => new ProductDTO
    {
        Name = p.Name,
        Price = p.Price
    })
    .ToListAsync();
foreach (var dto in productDTOs)
{
    Console.WriteLine($"DTO -> Name: {dto.Name} | Price: Rs.{dto.Price}");
}
Console.WriteLine("");

// Bonus - OrderBy Ascending
Console.WriteLine("=== Bonus: Sort - Price Low to High ===");
var ascending = await context.Products
    .OrderBy(p => p.Price)
    .ToListAsync();
foreach (var p in ascending)
{
    Console.WriteLine($"Name: {p.Name} | Price: Rs.{p.Price}");
}

Console.WriteLine("");
Console.WriteLine("=== Lab 7 Complete! ===");