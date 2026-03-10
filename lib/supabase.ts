
// Mock Supabase client using localStorage
const mockStorage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data)),
};

export const supabase = {
  channel: (name: string) => ({
    on: (event: string, config: any, callback: any) => supabase.channel(name),
    subscribe: () => ({}),
  }),
  removeChannel: (channel: any) => ({}),
  from: (table: string) => {
    const items = mockStorage.get(table);
    
    const createQuery = (filteredItems: any[]) => {
      const queryObj: any = {
        eq: (field: string, value: any) => createQuery(filteredItems.filter(i => i[field] === value)),
        select: (fields: string) => createQuery(filteredItems),
        order: (field: string, { ascending }: any) => createQuery([...filteredItems].sort((a, b) => {
           if (ascending) return a[field] > b[field] ? 1 : -1;
           return a[field] < b[field] ? 1 : -1;
        })),
        single: async () => ({ data: filteredItems[0], error: filteredItems[0] ? null : { message: 'Not found' } }),
        maybeSingle: async () => ({ data: filteredItems[0], error: null }),
        insert: async (data: any[]) => {
          const allItems = mockStorage.get(table);
          const newItems = [...allItems, ...data.map(item => ({ 
            ...item, 
            id: Math.random().toString(36).substr(2, 9), 
            created_at: new Date().toISOString() 
          }))];
          mockStorage.set(table, newItems);
          return { data: newItems, error: null };
        },
        // For Promise-like behavior
        then: (resolve: any) => resolve({ data: filteredItems, error: null })
      };
      return queryObj;
    };

    return createQuery(items);
  },
};

export const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};
