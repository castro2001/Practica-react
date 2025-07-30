
export const PageUsuarioDesktop = (props: IUsuarios)=>{

    const {id,email,password,name,role,avatar,creationAt,updateAt} = props;
    
    return (
        <>
    <div className="flex items-center space-x-4">
                {/* Tu diseño desktop aquí, usando product */}
                <span className="font-bold text-gray-500">{name}</span>
                </div>
        </>
    )

}