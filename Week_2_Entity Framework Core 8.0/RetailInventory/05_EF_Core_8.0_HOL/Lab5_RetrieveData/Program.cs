using Microsoft.EntityFrameworkCore;
using Lab5_RetrieveData;

Console.WriteLine("=== Lab 5: Retrieving Data from Database ===");
Console.WriteLine("");

using var context = new AppDbContext();
await context.Database.EnsureCreatedAsync();

// First add some data to retrieve
var electronics = new Category { Name = "Electronics" };
var groceries = new Category { Name = "Groceries" };
await context.Categories.AddRangeAsync(electronics, groceries);

var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };
var product3 = new Product { Name = "Smartphone", Price = 25000, Category = electronics };
await context.Products.AddRangeAsync(product1, product2, product3);
await context.SaveChangesAsync();

Console.WriteLine("Sample data inserted!");
Console.WriteLine("");

// Step 1 - Retrieve All Products
Console.WriteLine("=== Step 1: Retrieve All Products ===");
var products = await context.Products.ToListAsync();
foreach (var p in products)
{
    Console.WriteLine($"{p.Name} - Rs.{p.Price}");
}

Console.WriteLine("");

// Step 2 - Find by ID
Console.WriteLine("=== Step 2: Find Product by ID ===");
var product = await context.Products.FindAsync(1);
Console.WriteLine($"Found: {product?.Name}");

Console.WriteLine("");

// Step 3 - FirstOrDefault with Condition
Console.WriteLine("=== Step 3: FirstOrDefault with Condition ===");
var expensive = await context.Products
    .FirstOrDefaultAsync(p => p.Price > 50000);
Console.WriteLine($"Expensive Product: {expensive?.Name} - Rs.{expensive?.Price}");

Console.WriteLine("");
Console.WriteLine("=== Lab 5 Complete! ===");