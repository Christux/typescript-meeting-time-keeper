export function download(filename: string, json: Object) {
  const data = JSON.stringify(json, null, 4);
  const blob = new Blob([data], { type: 'application/json' });
  const jsonObjectUrl = URL.createObjectURL(blob);
  const anchorEl = document.createElement('a');

  anchorEl.setAttribute('href', jsonObjectUrl);
  anchorEl.setAttribute('download', filename);

  anchorEl.click();

  URL.revokeObjectURL(jsonObjectUrl);
}

export function isNullOrUndefined<T>(
  obj: T | null | undefined
): obj is null | undefined {
  return typeof obj === 'undefined' || obj === null;
}

export function timeToString(seconds: number): string {
  return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}