namespace CoreBuyNow.Models.DTOs;

public class ProductFilterDto
{
    public int Index { get; set; }
    public int Size { get; set; }
    public Guid? CategoryId {set; get;}
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? Keyword { get; set; }
    public string? Brand { get; set; }
    public bool? ShopType { get; set; }
    public Guid? SubCategoryId { get; set; }
    public int? Rating { get; set; }
    public string? SortBy { get; set; }
    public bool? IsHome { get; set; }
    public bool? IsFlashSale { get; set; }
}