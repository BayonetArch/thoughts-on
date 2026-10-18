type Level = "debug" | "info" | "warn" | "error";

function makeLog(level: Level) {
  function log(...args: unknown[]) {
    const date = new Date().toISOString();
    const levelStr = level.toUpperCase();

    console[level](`[${date}] ${levelStr}:`, ...args);
  }

  return log;
}

const logger = {
  debug: makeLog("debug"),
  info: makeLog("info"),
  warn: makeLog("warn"),
  error: makeLog("error"),
};

export default logger;
