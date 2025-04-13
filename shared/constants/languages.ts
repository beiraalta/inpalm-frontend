const portuguese = {
  FAILURE: {
    INVALID_EMAIL: "Campo deve ser um e-mail válido.",
    MANDATORY_FIELD: "Campo obrigatório.",
    PASSWORD_MISMATCH: "A senha e a confirmação não correspondem. Por favor, corrija.",
    SOMETHING_WRONG: "Algo deu errado!",
  },
  INFO: {
    ADD: "Adicionar",
    CANCEL: "Cancelar",
    CONFIRM_PASSWORD: "Confirmação de Senha",
    CONFIRM_REMOVAL: "Você deseja remover este registro? Esta operação não pode ser desfeita!",
    EDIT: "Editar",
    EMAIL: "E-mail",
    FILTER: "Filtrar",
    NAME: "Nome",
    PASSWORD: "Senha",
    PLACEHOLDER: (fieldName: string) => `Forneça o campo ${fieldName}`,
    SAVE: "Salvar",
    USER: "Usuário",
    USERS: "Usuários",
  }
};

export const DefaultLanguage = portuguese;