import { create } from 'zustand'

interface ProfileState {
    // Dialog States
    isBioDialogOpen: boolean
    setBioDialogOpen: (isOpen: boolean) => void

    isExperienceDialogOpen: boolean
    setExperienceDialogOpen: (isOpen: boolean) => void

    isEducationDialogOpen: boolean
    setEducationDialogOpen: (isOpen: boolean) => void

    isSkillsDialogOpen: boolean
    setSkillsDialogOpen: (isOpen: boolean) => void

    isCertificationDialogOpen: boolean
    setCertificationDialogOpen: (isOpen: boolean) => void

    isAwardDialogOpen: boolean
    setAwardDialogOpen: (isOpen: boolean) => void

    // Bio Form State
    bioForm: {
        firstName: string
        lastName: string
        role: string
        about: string
        featuredSkills: string[]
        nationality: string
        phoneCountryCode: string
        phoneNumber: string
        linkedin: string
        twitter: string
    }
    setBioForm: (data: Partial<ProfileState['bioForm']>) => void
    resetBioForm: () => void

    // Experience Form State
    experienceForm: {
        title: string
        employmentType: string
        companyName: string
        location: string
        isCurrent: boolean
        startMonth: string
        startYear: string
        endMonth: string
        endYear: string
        description: string
    }
    setExperienceForm: (data: Partial<ProfileState['experienceForm']>) => void
    resetExperienceForm: () => void

    // Skills Form State
    skillsForm: {
        selectedSkills: string[]
        selectedTools: string[]
    }
    setSkillsForm: (data: Partial<ProfileState['skillsForm']>) => void
    resetSkillsForm: () => void

    // Education Form State
    educationForm: {
        schoolName: string
        degree: string
        courseOfStudy: string
        monthObtained: string
        yearObtained: string
        currentlyEnrolled: boolean
    }
    setEducationForm: (data: Partial<ProfileState['educationForm']>) => void
    resetEducationForm: () => void

    // Certification Form State
    certificationForm: {
        issuingOrganization: string
        certificateTitle: string
        monthObtained: string
        yearObtained: string
        link: string
    }
    setCertificationForm: (data: Partial<ProfileState['certificationForm']>) => void
    resetCertificationForm: () => void

    // Award Form State
    awardForm: {
        issuingOrganization: string
        awardTitle: string
        monthObtained: string
        yearObtained: string
        link: string
    }
    setAwardForm: (data: Partial<ProfileState['awardForm']>) => void
    resetAwardForm: () => void
}

export const useProfileStore = create<ProfileState>((set) => ({
    // Dialog States
    isBioDialogOpen: false,
    setBioDialogOpen: (isOpen) => set({ isBioDialogOpen: isOpen }),

    isExperienceDialogOpen: false,
    setExperienceDialogOpen: (isOpen) => set({ isExperienceDialogOpen: isOpen }),

    isEducationDialogOpen: false,
    setEducationDialogOpen: (isOpen) => set({ isEducationDialogOpen: isOpen }),

    isSkillsDialogOpen: false,
    setSkillsDialogOpen: (isOpen) => set({ isSkillsDialogOpen: isOpen }),

    isCertificationDialogOpen: false,
    setCertificationDialogOpen: (isOpen) => set({ isCertificationDialogOpen: isOpen }),

    isAwardDialogOpen: false,
    setAwardDialogOpen: (isOpen) => set({ isAwardDialogOpen: isOpen }),

    // Bio Form State
    bioForm: {
        firstName: '',
        lastName: '',
        role: '',
        about: '',
        featuredSkills: [],
        nationality: '',
        phoneCountryCode: '234',
        phoneNumber: '',
        linkedin: '',
        twitter: '',
    },
    setBioForm: (data) => set((state) => ({
        bioForm: { ...state.bioForm, ...data }
    })),
    resetBioForm: () => set({
        bioForm: {
            firstName: '',
            lastName: '',
            role: '',
            about: '',
            featuredSkills: [],
            nationality: '',
            phoneCountryCode: '234',
            phoneNumber: '',
            linkedin: '',
            twitter: '',
        }
    }),

    // Experience Form State
    experienceForm: {
        title: '',
        employmentType: '',
        companyName: '',
        location: '',
        isCurrent: false,
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        description: '',
    },
    setExperienceForm: (data) => set((state) => ({
        experienceForm: { ...state.experienceForm, ...data }
    })),
    resetExperienceForm: () => set({
        experienceForm: {
            title: '',
            employmentType: '',
            companyName: '',
            location: '',
            isCurrent: false,
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            description: '',
        }
    }),

    // Skills Form State
    skillsForm: {
        selectedSkills: [
            "Prototyping",
            "User Interface",
            "Ux Research",
            "User Experience",
        ],
        selectedTools: ["Figma", "Sketch", "Framer"],
    },
    setSkillsForm: (data) => set((state) => ({
        skillsForm: { ...state.skillsForm, ...data }
    })),
    resetSkillsForm: () => set({
        skillsForm: {
            selectedSkills: [
                "Prototyping",
                "User Interface",
                "Ux Research",
                "User Experience",
            ],
            selectedTools: ["Figma", "Sketch", "Framer"],
        }
    }),

    // Education Form State
    educationForm: {
        schoolName: '',
        degree: '',
        courseOfStudy: '',
        monthObtained: '',
        yearObtained: '',
        currentlyEnrolled: false,
    },
    setEducationForm: (data) => set((state) => ({
        educationForm: { ...state.educationForm, ...data }
    })),
    resetEducationForm: () => set({
        educationForm: {
            schoolName: '',
            degree: '',
            courseOfStudy: '',
            monthObtained: '',
            yearObtained: '',
            currentlyEnrolled: false,
        }
    }),

    // Certification Form State
    certificationForm: {
        issuingOrganization: '',
        certificateTitle: '',
        monthObtained: '',
        yearObtained: '',
        link: '',
    },
    setCertificationForm: (data) => set((state) => ({
        certificationForm: { ...state.certificationForm, ...data }
    })),
    resetCertificationForm: () => set({
        certificationForm: {
            issuingOrganization: '',
            certificateTitle: '',
            monthObtained: '',
            yearObtained: '',
            link: '',
        }
    }),

    // Award Form State
    awardForm: {
        issuingOrganization: '',
        awardTitle: '',
        monthObtained: '',
        yearObtained: '',
        link: '',
    },
    setAwardForm: (data) => set((state) => ({
        awardForm: { ...state.awardForm, ...data }
    })),
    resetAwardForm: () => set({
        awardForm: {
            issuingOrganization: '',
            awardTitle: '',
            monthObtained: '',
            yearObtained: '',
            link: '',
        }
    }),
}))
