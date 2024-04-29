public record EmailTemplateRequest
{
    public ParamsRecord? Params { get; set; }
    public required List<RecipientRecord> To { get; set; }
    public int TemplateId { get; set; }
    
    public record ParamsRecord
    {
        public required string FNAME { get; set; }
        public required string URL { get; set; }
    }

    public record RecipientRecord
    {
        public required string Email { get; set; }
        public required string Name { get; set; }
    }
}