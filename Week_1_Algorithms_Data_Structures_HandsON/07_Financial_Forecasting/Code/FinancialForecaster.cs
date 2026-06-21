namespace FinancialForecastingExample
{
    public class FinancialForecaster
    {
        public double CalculateAverageGrowthRate(double[] pastValues)
        {
            double totalGrowth = 0;
            for (int i = 1; i < pastValues.Length; i++)
            {
                totalGrowth += (pastValues[i] - pastValues[i - 1]) / pastValues[i - 1];
            }
            return totalGrowth / (pastValues.Length - 1);
        }

        public double CalculateFutureValue(double presentValue, double growthRate, int years)
        {
            if (years == 0)
            {
                return presentValue;
            }

            double previousYearValue = CalculateFutureValue(presentValue, growthRate, years - 1);
            return previousYearValue * (1 + growthRate);
        }
    }
}