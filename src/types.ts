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
export type Transportista = {
  id: string | number;
  nombre: string;
  telefono?: string;
  email?: string | null;
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
export type TransportistaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Transportista;
  onSave?: (nombre: string, telefono: string, email?: string) => void;
};
export type AdicionalFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Adicional;
  onSave?: (tipo: string, costo_default: string) => void;
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
  label?: string;
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

export type Tarifa = {
  id: string | number;
  valor?: string;
  zona?: string;
  vehiculo?: string;
  carga?: string;
  transportista?: string;
  fecha?: string;
  costoAdicionales?: string;
  valor_base?: string;
  adicionales?: Adicional[];
  id_zona?: string | number;
  id_vehiculo?: string | number;
  id_carga?: string | number;
  id_transportista?: string | number;
};

export type TarifaFormProps = {
  id: string;
  title: string;
  mode: "view" | "edit" | "create";
  data?: Tarifa;
  onSave?: (tarifaData: {
    valor: string;
    id_zona: string;
    id_vehiculo: string;
    id_carga: string;
    id_transportista: string;
    adicionales: Adicional[];
  }) => void;
  dataZonas?: Zona[];
  dataVehiculos?: Vehiculo[];
  dataCargas?: Carga[];
  dataTransportistas?: any[];
  dataAdicionales?: any[];
};

export interface Adicional {
  id: number | string;
  tipo: string;
  costo?: number | string;
  costo_default: string;
  costo_personalizado?: number | string;
}

export interface ModalTipoAdicionalProps {
  id: string;
  dataAdicionales: Adicional[];
  adicionalSeleccionado: Adicional | null;
  costoAdicionalSeleccionado: string;
  customCostoAdicional: string;
  shouldValidate: boolean;
  errorMessage?: string;
  handleChangeCustomCostoAdicional: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeAdicionales: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaveTipoAdicional: () => void;
  handleCancelTipoAdicional: () => void;
}

export interface TarifaBasicDataSectionProps {
  mode: "view" | "edit" | "create";
  valor: string | undefined;
  vehiculo: string | undefined;
  zona: string | undefined;
  carga: string | undefined;
  transportista: string | undefined;
  vehiculoNombre?: string;
  zonaNombre?: string;
  cargaNombre?: string;
  transportistaNombre?: string;
  shouldValidate: boolean;
  dataVehiculos: any[];
  dataZonas: any[];
  dataCargas: any[];
  dataTransportistas: any[];
  onValorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVehiculoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onZonaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCargaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTransportistaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface TarifaAdicionalesSectionProps {
  adicionales: Adicional[];
  mode: "view" | "edit" | "create";
  onAgregarAdicional: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface TarifaResumenSectionProps {
  costoAdicionales: number;
  costoTotal: number;
}

// FilterValues para useTarifaFilters
export interface FilterValues {
  carga: string;
  vehiculo: string;
  zona: string;
  adicional: string;
  transportista: string;
}

// TarifaData para useTableData
export interface TarifaData {
  id: string | number;
  zona?: string;
  vehiculo?: string;
  carga?: string;
  transportista?: string;
  id_zona?: string | number;
  id_vehiculo?: string | number;
  id_carga?: string | number;
  id_transportista?: string | number;
  adicionales?: Array<{ id: string | number; [key: string]: any }>;
}

// Props para useTableData
export interface UseTableDataProps {
  data: TarifaData[];
  filtrosAplicados: boolean;
  valoresAplicados: FilterValues;
}

// Props para useTableActions
export interface UseTableActionsProps {
  data: any[];
  setSelectedRow: (row: any) => void;
}

// Props para FiltrosSection component
export interface FiltrosSectionProps {
  onApply: () => void;
  onClear: () => void;
  filtroCarga: string;
  filtroVehiculo: string;
  filtroZona: string;
  filtroAdicional: string;
  filtroTransportista: string;
  handleFiltroCarga: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFiltroVehiculo: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFiltroZona: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFiltroAdicional: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFiltroTransportista: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cargas?: any[];
  vehiculos?: any[];
  zonas?: any[];
  adicionales: any[];
  transportistas: any[];
}

// Props para TarifaModals component
export interface TarifaModalsProps {
  selectedRow: TarifaData | undefined;
  cargas?: any[];
  vehiculos?: any[];
  zonas?: any[];
  adicionales: any[];
  transportistas: any[];
  handleCreateTarifa: (
    valor: string,
    id_zona: string,
    id_vehiculo: string,
    id_carga: string,
    id_transportista: string,
    adicionales: any[]
  ) => Promise<any>;
  handleEditTarifa: (
    valor: string,
    id_zona: string,
    id_vehiculo: string,
    id_carga: string,
    id_transportista: string,
    adicionales: any[]
  ) => Promise<any>;
  handleDelete: (id: string | number) => Promise<any>;
  showToast: (
    title: string,
    message: string,
    type: "success" | "error"
  ) => void;
}

// ============================================
// Types e interfaces para hooks de TarifaForm
// ============================================

// TarifaFormData para useTarifaForm
export interface TarifaFormData {
  zona: string;
  vehiculo: string;
  carga: string;
  transportista: string;
  valor: string;
  idZona: string;
  idVehiculo: string;
  idCarga: string;
  idTransportista: string;
}

// Props para useTarifaForm
export interface UseTarifaFormProps {
  mode: "create" | "edit" | "view";
  data?: any;
  dataZonas?: any[];
  dataVehiculos?: any[];
  dataCargas?: any[];
  dataTransportistas?: any[];
  dataAdicionales?: any[];
}

// Props para useAdicionales
export interface UseAdicionalesProps {
  dataAdicionales?: any[];
}

// Props para useCostCalculation
export interface UseCostCalculationProps {
  adicionales: Adicional[];
  valor: string;
}

// Props para useTarifaFormHandlers
export interface TarifaFormHandlersProps {
  formData: TarifaFormData;
  updateField: (field: keyof TarifaFormData, value: string) => void;
  handleSelectChange: (
    field: "zona" | "vehiculo" | "carga" | "transportista",
    selectedId: string,
    dataArray?: any[],
    nameField?: string
  ) => void;
  dataZonas?: any[];
  dataVehiculos?: any[];
  dataCargas?: any[];
  dataTransportistas?: any[];
}

// Props para useTarifaFormActions
export interface UseTarifaFormActionsProps {
  id: string;
  mode: "create" | "edit" | "view";
  formData: TarifaFormData;
  adicionales: Adicional[];
  data?: any;
  isFormValid: () => boolean;
  setShouldValidate: (value: boolean) => void;
  resetForm: () => void;
  fillFormFromData: (data: any) => void;
  onSave?: (data: any) => void;
}

// Props para TarifaFormContent component
export interface TarifaFormContentProps {
  mode: "create" | "edit" | "view";
  formData: TarifaFormData;
  shouldValidate: boolean;
  adicionales: Adicional[];
  costoAdicionales: number;
  costoTotal: number;
  dataVehiculos: any[];
  dataZonas: any[];
  dataCargas: any[];
  dataTransportistas: any[];
  onValorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onVehiculoChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onZonaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onCargaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onTransportistaChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onAgregarAdicional: (e: React.MouseEvent) => void;
  onDeleteAdicional: (id: number) => void;
}

export interface NavbarMenuItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ElementType;
  };
  open: boolean;
}

export interface NavbarMenuButtonProps {
  open: boolean;
  toggleMenu: () => void;
}

export interface NavbarMenuItemsProps {
  open: boolean;
}
export interface HistorialCambios {
  [key: string]: any;
}

export interface HistorialTarifa {
  id: number;
  idtarifa: number;
  fecha: string;
  data: Tarifa;
  accion: "CREACION" | "MODIFICACION" | "ELIMINACION";
  cambios: HistorialCambios | null;
}
