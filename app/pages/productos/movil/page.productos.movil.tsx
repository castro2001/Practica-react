
export const PageProductosMovil = (props: IProduct)=>{
    const {id,title,slug,price,description,category,images,creationAt,updateAt} = props;
    
    return (
        <>
        <div className="p-2">
                {/* Tu diseño móvil aquí, usando product */}
                <span className="text-sm text-gray-500">{description}</span>
                </div>
        </>
    )

}