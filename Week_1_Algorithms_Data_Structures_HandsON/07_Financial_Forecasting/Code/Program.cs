using System;

namespace FinancialForecastingExample
{
    class Program
    {
        static void Main(string[] args)
        {
            double[] pastValues = { 1000, 1100, 1210, 1331, 1464.10 };

            FinancialForecaster forecaster = new FinancialForecaster();
            double growthRate = forecaster.CalculateAverageGrowthRate(pastValues);
            Console.WriteLine($"Average growth rate: {growthRate:P2}");

            double currentValue = pastValues[pastValues.Length - 1];
            int yearsToForecast = 5;

            double futureValue = forecaster.CalculateFutureValue(currentValue, growthRate, yearsToForecast);

            Console.WriteLine($"Current value: {currentValue:C2}");
            Console.WriteLine($"Forecasted value after {yearsToForecast} years: {futureValue:C2}");

            Console.ReadLine();
        }
    }
}