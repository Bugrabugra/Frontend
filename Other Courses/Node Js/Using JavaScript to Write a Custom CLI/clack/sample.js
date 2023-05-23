import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

async function main() {
  console.clear();

  await setTimeout(1000);

  p.intro(`${color.bgCyan(color.black(' create-app '))}`);

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: "What is your name?",
          placeholder: "Joe Beans",
          validate: (value) => {
            if (!value) {
              return "Please enter a name"
            }
            if (value.length < 2) {
              return "Name should have at least 2 characters"
            }
          }
        }),
      age: ({results}) =>
        p.text({
          message: `👋 ${results.name}! How old are you?`,
          placeholder: "18",
          validate: (value) => {
            if (!value) {
              return "Please enter your age"
            }
            if (!Number(value)) {
              return "Please enter a number"
            }
          }
        }),
      adventure: ({ results }) =>
        p.select({
          message: `${results.name}, Which adventure would you like?`,
          initialValue: 'easy',
          options: [
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
          ],
        }),
      install: ({ results }) =>
        p.confirm({
          message: `You're too ${results.age > 25 ? "old" : "young"} for the ${results.adventure}! Are you sure?`,
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Don't be a quitter!");
        process.exit(0);
      },
    }
  );

  if (project.install) {
    const s = p.spinner();
    s.start(`Initializing ${project.adventure} level`);
    await setTimeout(5000);
    s.stop(`Time to start the ${project.adventure} level`);
  }

  let nextSteps = `Get a walking stick, ${project.name} \nGet your butt moving.`;

  p.note(nextSteps, 'Next steps.');

  p.outro(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`);
}

main().catch(console.error);
