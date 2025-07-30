
export const PageUsuarioMovil = (props: IUsuarios)=>{
      const {id,email,password,name,role,avatar,creationAt,updateAt} = props;
    return (
        <>
            <div className="p-2">
                {/* Tu diseño móvil aquí, usando product */}
                <span className="text-sm text-gray-500">{role}</span>
                </div>
        </>
    )

}