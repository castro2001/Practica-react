
export const Section = (props:ISection)=>{
    const {classNameContainer,content}= props;

    return(
        <>
        <div className={`${classNameContainer !="" ? classNameContainer: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" }`}>
            {content}
        </div>
        </>
    )
}