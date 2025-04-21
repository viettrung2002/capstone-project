﻿namespace CoreBuyNow.Models.DTOs;

public class PageResponseDto<TEntity>(int pageIndex, int pageSize, long count, IEnumerable<TEntity> items)
{
    public int PageIndex => pageIndex;
    public int PageSize => pageSize;
    public long Count => count;
    public IEnumerable<TEntity> Items => items;
}
