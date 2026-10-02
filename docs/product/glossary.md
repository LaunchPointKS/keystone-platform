# Glossary

| Term               | Meaning                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Organization       | A general contractor, contractor, or subcontractor company; the hard tenant boundary              |
| Prospect           | A potential client belonging to an organization                                                   |
| Client             | A customer relationship after work is won; promotion preserves the prospect's history             |
| Site               | A physical customer location that can have many bids and projects over time                       |
| Bid                | A potential job or commercial pursuit; it is not an operational project                           |
| Estimate version   | An immutable priced revision associated with a bid                                                |
| Design version     | An immutable revision of pre-win survey, drawing, or system-design material associated with a bid |
| Accepted bid       | The auditable conversion result that pins selected commercial versions and creates a project      |
| `AcceptBid`        | The idempotent application command and transaction that performs the commercial conversion        |
| Project            | An operational job owned by one organization, created directly or from an accepted bid            |
| Membership         | A user's relationship and role within an organization                                             |
| Project membership | Explicit access by a user or outside organization to one project                                  |
| Team               | An operational crew or group; distinct from an authorization role                                 |
| Principal          | The application-owned identity and access context resolved for a request                          |
| Domain event       | A durable statement that a meaningful business change occurred                                    |
| Activity event     | A user-facing feed projection created from domain activity                                        |
| Outbox             | Database records committed with a business write and later delivered by workers                   |
| Sync cursor        | An opaque client checkpoint into an ordered server change feed                                    |
