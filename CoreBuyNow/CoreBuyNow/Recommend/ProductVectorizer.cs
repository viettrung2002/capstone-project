using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Recommend;

public class ProductVectorizer
{
    private readonly TfidfVectorizer _tfidf;
    private readonly double _maxPrice;
    private readonly double _maxRating;

    public ProductVectorizer(TfidfVectorizer tfidf, double maxPrice, double maxRating)
    {
        _tfidf = tfidf;
        _maxPrice = maxPrice;
        _maxRating = maxRating;
    }

    public double[] BuildVector(Product product)
    {
        var text = $"{product.ProductName} {product.SubCategory?.SubCategoryName} " +
                   string.Join(" ", product.Specifications.Select(kvp => $"{kvp.Key} {kvp.Value}"));

        var tfidfVector = _tfidf.Transform(text);
        double priceNorm = (double)product.Price / (_maxPrice + 1e-5);
        double ratingNorm = product.Rating / (_maxRating + 1e-5);

        var combined = new double[tfidfVector.Length + 2];
        tfidfVector.CopyTo(combined, 0);
        combined[^2] = priceNorm;
        combined[^1] = ratingNorm;

        return combined;
    }
}