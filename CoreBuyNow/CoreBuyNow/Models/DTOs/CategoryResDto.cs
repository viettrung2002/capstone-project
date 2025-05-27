using CoreBuyNow.Models.Entities;

public class CategoryResDto {
    public Guid CategoryId { get; set; }
    public string CategoryName {set; get;}
    public string? ImageUrl {set; get;}
    public List<SubCategory> SubCategory {set; get;}
}