export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  match (data: object): QueryBuilder {
    return this.addStep('$match', data)
  }

  build (): object[] {
    return this.query
  }
}
