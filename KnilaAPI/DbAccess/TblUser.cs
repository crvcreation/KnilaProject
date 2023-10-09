using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblUser
{
    public long Id { get; set; }

    public string FullName { get; set; } = null!;

    public string UsrName { get; set; } = null!;

    public string UsrPassword { get; set; } = null!;
}
