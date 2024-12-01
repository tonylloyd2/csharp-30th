using Microsoft.EntityFrameworkCore;
using TogetherCulture.Core.Entities;
using System.Linq.Expressions;
using System.Text.Json;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Member> Members => Set<Member>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<ContentModule> ContentModules => Set<ContentModule>();
        public DbSet<Connection> Connections => Set<Connection>();
        public DbSet<Conversation> Conversations => Set<Conversation>();
        public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
        public DbSet<ConversationParticipant> ConversationParticipants => Set<ConversationParticipant>();
        public DbSet<Document> Documents => Set<Document>();
        public DbSet<EventAttendance> EventAttendances => Set<EventAttendance>();
        public DbSet<ModuleProgress> ModuleProgresses => Set<ModuleProgress>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure soft delete filter
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var property = Expression.Property(parameter, "IsDeleted");
                    var falseConstant = Expression.Constant(false);
                    var lambda = Expression.Lambda(Expression.Equal(property, falseConstant), parameter);
                    
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }

            // Configure relationships
            modelBuilder.Entity<User>()
                .HasOne(u => u.Member)
                .WithOne(m => m.User)
                .HasForeignKey<Member>(m => m.UserId);

            modelBuilder.Entity<Event>()
                .HasMany(e => e.Attendances)
                .WithOne(a => a.Event)
                .HasForeignKey(a => a.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ContentModule>()
                .HasMany(c => c.Bookings)
                .WithOne(b => b.ContentModule)
                .HasForeignKey(b => b.ContentModuleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Member>()
                .HasMany(m => m.Benefits)
                .WithOne(b => b.Member)
                .HasForeignKey(b => b.MemberId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure new entity relationships
            modelBuilder.Entity<Connection>()
                .HasOne(c => c.CreatedBy)
                .WithMany()
                .HasForeignKey(c => c.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Conversation)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Participants)
                .WithOne(p => p.Conversation)
                .HasForeignKey(p => p.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ChatMessage>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Document>()
                .HasOne(d => d.UploadedBy)
                .WithMany()
                .HasForeignKey(d => d.UploadedById)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Member Interests JSON conversion
            modelBuilder.Entity<Member>()
                .Property(m => m.InterestsJson)
                .HasColumnType("json");
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Convert Interests to JSON before saving
            var entries = ChangeTracker
                .Entries<Member>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.Entity.Interests != null)
                {
                    entry.Entity.InterestsJson = JsonSerializer.Serialize(entry.Entity.Interests);
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            // Convert Interests to JSON before saving
            var entries = ChangeTracker
                .Entries<Member>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.Entity.Interests != null)
                {
                    entry.Entity.InterestsJson = JsonSerializer.Serialize(entry.Entity.Interests);
                }
            }

            return base.SaveChanges();
        }
    }
}