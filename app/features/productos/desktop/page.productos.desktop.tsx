
export const PageProductosDesktop = (props: IProduct)=>{
    const {id,title,slug,price,description,category,images,creationAt,updateAt} = props;

    return (
        <>
          <div className="flex items-center space-x-4">
                {/* Tu diseño desktop aquí, usando product */}
                <span className="font-bold text-gray-500">{title}</span>
                </div>
        </>
    )

}