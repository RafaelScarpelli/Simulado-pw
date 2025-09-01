import BaseService from "./BaseService";

class InvestimentoService extends BaseService {
    constructor() {
        super("/investimentos"); // endpoint definido no backend
    }

    async calcular(dados) {
        // envia o objeto direto no body
        const resposta = await this.api.post(`${this.endPoint}/calcular`, dados);
        return resposta;
    }

    async salvar(dados) {
        // envia o objeto direto no body
        const resposta = await this.api.post(this.endPoint, dados);
        return resposta;
    }

    async buscarTodos() {
        const resposta = await this.api.get(this.endPoint);
        return resposta;
    }

    async limparTabela() {
        const resposta = await this.api.delete(this.endPoint);
        return resposta;
    }

    async filtrarDataExata(data) {
        return await this.api.get(`${this.endPoint}/filtrar/data/${data}`);
    }

    async filtrarPrazo(prazo) {
        return await this.api.get(`${this.endPoint}/filtrar/prazo/${prazo}`);
    }

    async filtrarJuros(taxa) {
        return await this.api.get(`${this.endPoint}/filtrar/juros/${taxa}`);
    }
}

export default new InvestimentoService();