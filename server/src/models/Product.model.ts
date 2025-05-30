import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';


@Table({
    tableName: "products",

})

class Product extends Model<Product> {
    @Column({
        type: DataType.STRING(100)
    })
    name: string;
    @Column({
        type: DataType.FLOAT
    })
    price: number;
    
    @Default(true)
    @Column({
        type:DataType.BOOLEAN
    })
    availability: boolean;

}

export default Product