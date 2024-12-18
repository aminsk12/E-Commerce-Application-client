/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterAndConvertFields<T extends Record<string, any>>(
  obj: T,
  fieldsToConvert: string[] // Pass the fields to convert dynamically
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => {
        // Exclude empty strings, null, undefined, or empty FileLists
        if (value === "" || value === null || value === undefined) {
          return false;
        }
        if (value instanceof FileList && value.length === 0) {
          return false;
        }
        return true;
      })
      .map(([key, value]) => {
        // Convert specified fields to numbers
        if (fieldsToConvert.includes(key)) {
          return [key, Number(value)];
        }
        return [key, value];
      })
  ) as Partial<T>; // Explicitly cast the result
}
