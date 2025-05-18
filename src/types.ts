export interface TableAction {
  name: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
}

export type Zona = {
  id: string | number;
  nombre: string;
};

export type ZonaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Zona;
  onSave?: (nombre: string) => void;
};

export type VehiculoFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Vehiculo;
  onSave?: (vehiculo: { tipo: string; toneladas: string | number }) => void;
};

export type ToastProps = {
  type: "success" | "error";
  title: string;
  message: string;
  open: boolean;
  onClose?: () => void;
};

export type TableProps = {
  data: any[];
  viewButton?: boolean;
  editButton?: boolean;
  deleteButton?: boolean;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (id: string | number) => void;
  rowsPerPage?: number;
};

export type TextInputProps = {
  label?: string;
  placeholder?: string;
  Icon?: React.ReactNode;
  id?: string;
  name?: string;
  className?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

export type DateInputProps = {
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Vehiculo = {
  id: string | number;
  tipo: string;
  toneladas: number;
};
