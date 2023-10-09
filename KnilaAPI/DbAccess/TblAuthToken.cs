using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblAuthToken
{
    public long Id { get; set; }

    public int UsrId { get; set; }

    public string RefreshToken { get; set; } = null!;

    public DateTime? ExpDate { get; set; }
}
