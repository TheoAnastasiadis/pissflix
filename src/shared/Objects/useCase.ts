export interface UseCase<RepoType, ParamType, ReturnType> {
    (repo: RepoType, param: ParamType): Promise<ReturnType>
}
