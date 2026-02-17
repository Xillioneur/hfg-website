-- Database schema for HolyForge Games

-- Table for newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
    email TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for game heart counts
CREATE TABLE IF NOT EXISTS hearts (
    game_id TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
);

-- Initialize heart counts for current games
INSERT OR IGNORE INTO hearts (game_id, count) VALUES ('sample', 0);
INSERT OR IGNORE INTO hearts (game_id, count) VALUES ('cr-episode-8', 0);
INSERT OR IGNORE INTO hearts (game_id, count) VALUES ('cr-episode-10', 0);
INSERT OR IGNORE INTO hearts (game_id, count) VALUES ('starforge-3d', 0);
