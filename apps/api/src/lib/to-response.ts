import { Static, Type as t, TObject, TArray, TProperties } from '@sinclair/typebox';

export function toResponse<T extends TObject | TArray>(schema: T, data: any): Static<T> {
  if (!data) return data;

  // Obsługa tablic
  if (schema.type === 'array') {
    if (!Array.isArray(data)) return data;
    const itemSchema = (schema as TArray).items as TObject;
    return data.map((item) => toResponse(itemSchema, item));
  }

  // Obsługa obiektów
  const result: Record<string, any> = {};
  const properties = (schema as TObject).properties as TProperties;

  for (const key in properties) {
    if (key in data) {
      const propertySchema = properties[key];

      if (propertySchema.type === 'object' && data[key]) {
        result[key] = toResponse(propertySchema, data[key]);
      } else if (propertySchema.type === 'array' && Array.isArray(data[key])) {
        result[key] = toResponse(propertySchema, data[key]);
      } else {
        result[key] = data[key];
      }
    }
  }

  return result as Static<T>;
}
