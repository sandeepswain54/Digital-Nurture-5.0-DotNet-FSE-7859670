using Microsoft.EntityFrameworkCore;
using Lab6_UpdateDelete;

Console.WriteLine("=== Lab 6: Updating and Deleting Records ===");
Console.WriteLine("");

using var context = new AppDbContext();
await context.Database.EnsureCreatedAsync();

// Insert sample data first
var electronics = new Category { Name = "Electronics" };
var groceries = new Category { Name = "Groceries" };
await context.Categories.AddRangeAsync(electronics, groceries);

var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };
var product3 = new Product { Name = "Smartphone", Price = 25000, Category = electronics };
await context.Products.AddRangeAsync(product1, product2, product3);
await context.SaveChangesAsync();

// Show data BEFORE update/delete
Console.WriteLine("=== Products BEFORE Update/Delete ===");
var allProducts = await context.Products.ToListAsync();
foreach (var p in allProducts)
{
    Console.WriteLine($"ID: {p.Id} | Name: {p.Name} | Price: Rs.{p.Price}");
}
Console.WriteLine("");

// Step 1 - UPDATE Product Price
Console.WriteLine("=== Step 1: Updating Laptop Price ===");
var product = await context.Products
    .FirstOrDefaultAsync(p => p.Name == "Laptop");

if (product != null)
{
    Console.WriteLine($"Old Price: Rs.{product.Price}");
    product.Price = 70000;
    await context.SaveChangesAsync();
    Console.WriteLine($"New Price: Rs.{product.Price}");
    Console.WriteLine("Laptop price updated successfully!");
}
Console.WriteLine("");

// Step 2 - DELETE Product
Console.WriteLine("=== Step 2: Deleting Rice Bag ===");
var toDelete = await context.Products
    .FirstOrDefaultAsync(p => p.Name == "Rice Bag");

if (toDelete != null)
{
    context.Products.Remove(toDelete);
    await context.SaveChangesAsync();
    Console.WriteLine("Rice Bag deleted successfully!");
}
Console.WriteLine("");

// Show data AFTER update/delete
Console.WriteLine("=== Products AFTER Update/Delete ===");
var updatedProducts = await context.Products.ToListAsync();
foreach (var p in updatedProducts)
{
    Console.WriteLine($"ID: {p.Id} | Name: {p.Name} | Price: Rs.{p.Price}");
}

Console.WriteLine("");
Console.WriteLine("=== Lab 6 Complete! ===");