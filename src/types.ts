export interface TableAction {
  name: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
}

export type Zona = {
  id: string | number;
  nombre: string;
};
export type Carga = {
  id?: string | number;
  peso: string;
  volumen: string;
  tipo: string;
  requisitos: string;
};

export type TipoCarga = {
  id: string | number;
  descripcion: string;
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

export type CargaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Carga;
  dataTipoDeCargas?: TipoCarga[];
  onSave?: (
    peso: string,
    volumen: string,
    tipoDeCarga: string,
    requisitosEspeciales: string
  ) => void;
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
  shouldValidate?: boolean;
  className?: string;
  errorMessage?: string;
  type: "text" | "number";
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

export type SelectInputProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  shouldValidate?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
};

export type DateInputProps = {
  required?: boolean;
  shouldValidate?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Vehiculo = {
  id: string | number;
  tipo: string;
  toneladas: number;
};

export type TipoCargaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: TipoCarga;
  onSave?: (descripcion: string) => void;
};
