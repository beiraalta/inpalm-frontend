const portuguese = {
  FAILURE: {
    INVALID_EMAIL: "Campo deve ser um e-mail válido.",
    MANDATORY_FIELD: "Campo obrigatório.",
    PASSWORD_MISMATCH: "A senha e a confirmação não correspondem. Por favor, corrija.",
    SOMETHING_WRONG: "Algo deu errado!",
  },
  INFO: {
    ADD: "Adicionar",
    ASSEMBLY_TEAM: "Equipe de Montagem",
    CANCEL: "Cancelar",
    CHECKLIST: "Checklist",
    CHECKLISTS: "Checklists",
    CONFIRM_PASSWORD: "Confirmação de Senha",
    CONFIRM_REMOVAL: "Você deseja remover este registro? Esta operação não pode ser desfeita!",
    CUSTOMER: "Cliente",
    DELIVERY_RESPONSIBLE_PNC: "Responsável pela Entrega PNC",
    EDIT: "Editar",
    EMAIL: "E-mail",
    EMPTY: "Vazio!",
    ENVIRONMENTS: "Ambientes",
    FILTER: "Filtrar",
    INSPECTED_BY: "Inspetor de Qualidade",
    NAME: "Nome",
    NOTE: "Observação",
    PASSWORD: "Senha",
    PHOTO: "Foto",
    PLACEHOLDER: (fieldName: string) => `Forneça o campo ${fieldName}`,
    PROJECT_CODE: "Código do Projeto",
    REMOVE: "Remover",
    SAVE: "Salvar",
    TECHNICAL_REPORTS: "Parecer Técnico",
    USER: "Usuário",
    USERS: "Usuários",
  }
};

export const defaultLanguage = portuguese;