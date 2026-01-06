# Football Results API Documentation

## Base URL
```
/api/football/v1/results
```

## Endpoints

### 1. Get All Match Results
Retrieve all football match results with optional pagination.

**Endpoint:**
```
GET /api/football/v1/results
```

**Query Parameters:**
- `page` (optional): Page number (default: 1, minimum: 1)
- `limit` (optional): Number of results per page (default: 50, minimum: 1, maximum: 100)

**Examples:**
```
GET /api/football/v1/results
GET /api/football/v1/results?page=2
GET /api/football/v1/results?page=1&limit=100
GET /api/football/v1/results?page=3&limit=25
```

**Response:**
```json
{
  "matches": [
    {
      "_id": "...",
      "league": "Premier League",
      "homeTeam": "Manchester United",
      "awayTeam": "Liverpool",
      "homeScore": 2,
      "awayScore": 1,
      "date": "06-01-2026"
    }
  ]
}
```

---

### 2. Get Specific Match Results
Search for specific match results using various filters.

**Endpoint:**
```
GET /api/football/v1/results/specific
```

**Query Parameters:**
- `team` (optional): Team name in quotes
- `league` (optional): League name in quotes
- `date` (optional): Match date in DD-MM-YYYY format in quotes

**Note:** You can combine certain parameters together for more specific searches.

#### 2.1 Search by Team
Returns all matches where the specified team played (home or away).

**Example:**
```
GET /api/football/v1/results/specific?team="Manchester United"
```

#### 2.2 Search by League
Returns all matches in the specified league.

**Example:**
```
GET /api/football/v1/results/specific?league="Premier League"
```

#### 2.3 Search by Date
Returns all matches played on a specific date.

**Example:**
```
GET /api/football/v1/results/specific?date="06-01-2026"
```

#### 2.4 Search by Team and Date
Returns matches for a specific team on a specific date.

**Example:**
```
GET /api/football/v1/results/specific?team="Manchester United"&date="06-01-2026"
```

#### 2.5 Search by League and Date
Returns all matches in a specific league on a specific date.

**Example:**
```
GET /api/football/v1/results/specific?league="Premier League"&date="06-01-2026"
```

---

## Response Format

### Success Response (200)
```json
{
  "matches": [
    {
      "_id": "unique_id",
      "league": "League Name",
      "homeTeam": "Home Team Name",
      "awayTeam": "Away Team Name",
      "homeScore": 2,
      "awayScore": 1,
      "date": "DD-MM-YYYY"
    }
  ]
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Query error !"
}
```
or
```json
{
  "message": "Invalid pagination parameters. Page must be >= 1, limit between 1-100"
}
```

#### 404 Not Found
```json
{
  "message": "404 - Page Not Found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Not found data!",
  "error": "error_details"
}
```

---

## Important Notes

1. **Quotes Required:** When using query parameters like team, league, or date, wrap the values in double quotes (e.g., `team="Manchester United"`).

2. **Date Format:** Dates must be in DD-MM-YYYY format (e.g., "06-01-2026" for January 6, 2026).

3. **Pagination Limits:** 
   - Page must be >= 1
   - Limit must be between 1 and 100
   - Default limit is 50 results per page

4. **Case Sensitivity:** Team and league names are case-sensitive. Make sure to use exact names.

5. **Team Search:** When searching by team, the API returns matches where the team played either as home or away team.

6. **Parameter Combinations:**
   - ✅ team + date
   - ✅ league + date
   - ❌ team + league (not supported, will return query error)

---

## Example Usage

### cURL Examples

```bash
# Get all results (first page)
curl http://localhost:3000/api/football/v1/results

# Get page 2 with custom limit
curl http://localhost:3000/api/football/v1/results?page=2&limit=25

# Search by team
curl "http://localhost:3000/api/football/v1/results/specific?team=\"Manchester United\""

# Search by league
curl "http://localhost:3000/api/football/v1/results/specific?league=\"Premier League\""

# Search by date
curl "http://localhost:3000/api/football/v1/results/specific?date=\"06-01-2026\""

# Search by team and date
curl "http://localhost:3000/api/football/v1/results/specific?team=\"Liverpool\"&date=\"15-12-2025\""

# Search by league and date
curl "http://localhost:3000/api/football/v1/results/specific?league=\"La Liga\"&date=\"20-12-2025\""
```

### JavaScript/Fetch Examples

```javascript
// Get all results
fetch('/api/football/v1/results')
  .then(response => response.json())
  .then(data => console.log(data));

// Get specific team results
fetch('/api/football/v1/results/specific?team="Barcelona"')
  .then(response => response.json())
  .then(data => console.log(data));

// Get league results for a specific date
fetch('/api/football/v1/results/specific?league="Serie A"&date="01-01-2026"')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Contact & Support

For issues, feature requests, or questions about the API, please contact the development team.