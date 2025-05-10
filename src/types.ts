export interface TableAction {
  name: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
}

export type Zona = {
  id: number;
  nombre: string;
};

export type ZonaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Zona;
  onSave?: (nombre: string) => void;
};
