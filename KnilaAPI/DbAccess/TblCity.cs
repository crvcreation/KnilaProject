using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblCity
{
    public int CityId { get; set; }

    public string? CityName { get; set; }

    public int? StateId { get; set; }

    public virtual TblState? State { get; set; }

    public virtual ICollection<TblContact> TblContacts { get; set; } = new List<TblContact>();
}
