using System;

namespace TogetherCulture.Core.Entities
{
    public class Document : BaseEntity
    {
        public string Title { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string StoragePath { get; set; }
        public long Size { get; set; }
        public DateTime UploadedAt { get; set; }
        public int UploadedById { get; set; }
        public Member UploadedBy { get; set; }
    }
}