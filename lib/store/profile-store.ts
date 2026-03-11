import { create } from 'zustand'

export interface Experience {
    id: string
    role: string
    company: string
    employmentType: string
    startDate: string
    endDate: string
    isCurrent: boolean
    location: string
    locationType: string
    details: string
    skills: string[]
    tools: string[]
    isCollapsed: boolean
}

export interface Project {
    id: string
    title: string
    description: string
    link: string
    skills: string[]
    tools: string[]
    image?: string
}

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

    isProjectsDialogOpen: boolean
    setProjectsDialogOpen: (isOpen: boolean) => void

    isViewApplicationDialogOpen: boolean
    setViewApplicationDialogOpen: (isOpen: boolean) => void

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
    experiences: Experience[]
    addExperience: () => void
    updateExperience: (id: string, data: Partial<Experience>) => void
    removeExperience: (id: string) => void
    toggleExperienceCollapse: (id: string) => void
    resetExperiences: () => void

    // Projects State
    projects: Project[]
    addProject: (project: Omit<Project, 'id'>) => void
    updateProject: (id: string, data: Partial<Project>) => void
    removeProject: (id: string) => void
    resetProjects: () => void

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

    // Project Form State
    projectForm: {
        title: string
        description: string
        link: string
        skills: string[]
        tools: string[]
        image?: string
    }
    setProjectForm: (data: Partial<ProfileState['projectForm']>) => void
    resetProjectForm: () => void
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

    isProjectsDialogOpen: false,
    setProjectsDialogOpen: (isOpen) => set({ isProjectsDialogOpen: isOpen }),

    isViewApplicationDialogOpen: false,
    setViewApplicationDialogOpen: (isOpen) => set({ isViewApplicationDialogOpen: isOpen }),

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
    experiences: [{
        id: 'default-experience',
        role: '',
        company: '',
        employmentType: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        location: '',
        locationType: '',
        details: '',
        skills: [],
        tools: [],
        isCollapsed: false,
    }],
    addExperience: () => set((state) => ({
        experiences: [
            ...state.experiences,
            {
                id: Math.random().toString(36).substring(2, 9),
                role: '',
                company: '',
                employmentType: '',
                startDate: '',
                endDate: '',
                isCurrent: false,
                location: '',
                locationType: '',
                details: '',
                skills: [],
                tools: [],
                isCollapsed: false,
            }
        ]
    })),
    updateExperience: (id, data) => set((state) => ({
        experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
        )
    })),
    removeExperience: (id) => set((state) => ({
        experiences: state.experiences.filter((exp) => exp.id !== id)
    })),
    toggleExperienceCollapse: (id) => set((state) => ({
        experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, isCollapsed: !exp.isCollapsed } : exp
        )
    })),
    resetExperiences: () => set({
        experiences: [{
            id: 'default-experience',
            role: '',
            company: '',
            employmentType: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            location: '',
            locationType: '',
            details: '',
            skills: [],
            tools: [],
            isCollapsed: false,
        }]
    }),

    // Projects State
    projects: [],
    addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Math.random().toString(36).substring(2, 9) }]
    })),
    updateProject: (id, data) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...data } : p)
    })),
    removeProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
    })),
    resetProjects: () => set({ projects: [] }),

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

    // Project Form State
    projectForm: {
        title: '',
        description: '',
        link: '',
        skills: [],
        tools: [],
        image: undefined,
    },
    setProjectForm: (data) => set((state) => ({
        projectForm: { ...state.projectForm, ...data }
    })),
    resetProjectForm: () => set({
        projectForm: {
            title: '',
            description: '',
            link: '',
            skills: [],
            tools: [],
            image: undefined,
        }
    }),
}))
