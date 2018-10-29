export const validateListenCmd = (cmd: string) => {
  return cmd.match(/^listen [a-a0-9]+$/i) !== null;
};
