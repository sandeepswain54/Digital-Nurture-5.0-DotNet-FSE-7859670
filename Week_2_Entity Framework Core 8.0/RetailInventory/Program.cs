using Microsoft.EntityFrameworkCore;

using var context = new AppDbContext();
await context.Database.EnsureCreatedAsync();
Console.WriteLine("Database connected and created successfully!");