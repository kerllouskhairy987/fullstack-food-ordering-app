type TProps = {
    subTitle: string;
    title: string;
}
const Heading = ({ subTitle, title }: TProps) => {
    return (
        <div>
            <span className="text-accent-foreground/50 text-lg uppercase">{subTitle}</span>
            <h2 className="text-primary font-semibold text-2xl md:text-3xl capitalize">{title}</h2>
        </div>
    )
}

export default Heading