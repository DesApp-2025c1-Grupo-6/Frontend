export interface TableAction {
  name: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
}
