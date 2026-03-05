import { create } from 'zustand';

export type InsuranceType = 'auto' | 'health' | 'life';

export interface BaseFields {
  fullName: string;
  mobile: string;
  email: string;
  insuranceType: InsuranceType | '';
}

export interface AutoFields {
  vehicleType: string;
  vehicleAge: string;
  previousPolicy: 'yes' | 'no' | '';
  claimHistory: 'yes' | 'no' | '';
}

export interface HealthFields {
  coverageType: 'self' | 'family' | 'parents' | 'self_family' | '';
  memberAgeGroup: string;
  city: string;
  pin: string;
  preExistingDisease: string;
  coverageTier: 'basic' | 'standard' | 'premium' | '';
}

export interface LifeFields {
  age: string;
  annualIncome: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  dependents: string;
  smoker: 'yes' | 'no' | '';
}

export interface ConditionalFields {
  auto: AutoFields;
  health: HealthFields;
  life: LifeFields;
}

interface LeadFormState {
  baseFields: BaseFields;
  conditionalFields: ConditionalFields;
  selectedInsuranceType: InsuranceType | null;
  loading: boolean;
  error: string | null;
  leadId: string | null;
  completed: boolean;
  setBaseField: <K extends keyof BaseFields>(key: K, value: BaseFields[K]) => void;
  setConditionalField: <T extends InsuranceType, K extends keyof ConditionalFields[T]>(
    type: T,
    key: K,
    value: ConditionalFields[T][K]
  ) => void;
  setInsuranceType: (type: InsuranceType | null) => void;
  setFromPreset: (type: InsuranceType) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  setLeadId: (id: string | null) => void;
  setCompleted: (done: boolean) => void;
  reset: () => void;
}

const createEmptyState = (): Pick<
  LeadFormState,
  'baseFields' | 'conditionalFields' | 'selectedInsuranceType' | 'loading' | 'error' | 'leadId' | 'completed'
> => ({
  baseFields: {
    fullName: '',
    mobile: '',
    email: '',
    insuranceType: '',
  },
  conditionalFields: {
    auto: {
      vehicleType: '',
      vehicleAge: '',
      previousPolicy: '',
      claimHistory: '',
    },
    health: {
      coverageType: '',
      memberAgeGroup: '',
      city: '',
      pin: '',
      preExistingDisease: '',
      coverageTier: '',
    },
    life: {
      age: '',
      annualIncome: '',
      maritalStatus: '',
      dependents: '',
      smoker: '',
    },
  },
  selectedInsuranceType: null,
  loading: false,
  error: null,
  leadId: null,
  completed: false,
});

export const useLeadFormStore = create<LeadFormState>((set) => ({
  ...createEmptyState(),
  setBaseField: (key, value) =>
    set((state) => ({
      baseFields: {
        ...state.baseFields,
        [key]: value,
      },
    })),
  setConditionalField: (type, key, value) =>
    set((state) => ({
      conditionalFields: {
        ...state.conditionalFields,
        [type]: {
          ...state.conditionalFields[type],
          [key]: value,
        },
      },
    })),
  setInsuranceType: (type) =>
    set((state) => ({
      selectedInsuranceType: type,
      baseFields: {
        ...state.baseFields,
        insuranceType: type ?? '',
      },
    })),
  setFromPreset: (type) =>
    set((state) => ({
      selectedInsuranceType: type,
      baseFields: {
        ...state.baseFields,
        insuranceType: type,
      },
    })),
  setLoading: (loading) => set({ loading }),
  setError: (message) => set({ error: message }),
  setLeadId: (id) => set({ leadId: id }),
  setCompleted: (done) => set({ completed: done }),
  reset: () => set(createEmptyState()),
}));

