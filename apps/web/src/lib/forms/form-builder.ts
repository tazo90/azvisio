type Width = 'full' | '1/2' | '1/3' | '1/4';

export const f = {
  text: (label: string, width: Width = 'full') => ({
    name: label.toLowerCase(),
    type: 'text',
    label,
    width,
  }),

  email: (label: string = 'Email', width: Width = 'full') => ({
    name: label.toLowerCase(),
    type: 'email',
    label,
    width,
  }),

  select: (label: string, width: Width = 'full', options?: { label: string; value: string }[]) => ({
    name: label.toLowerCase(),
    type: 'select',
    label,
    options,
    width,
  }),
};

export const row = (...fields: any[]) => fields;

export const form = (title: string, ...rows: any[][]) => ({
  title,
  rows,
});

// const createTeamForm = form(
//   'Create Team',
//   row(f.text('Name', '1/2'), f.text('Code', '1/2')),
//   row(
//     f.text('Description') // domyślnie 'full'
//   ),
//   row(
//     f.select(
//       'Type',
//       [
//         { label: 'Public', value: 'PUBLIC' },
//         { label: 'Private', value: 'PRIVATE' },
//       ],
//       '1/3'
//     ),
//     f.text('Category', '1/3'),
//     f.text('Status', '1/3')
//   )
// );
