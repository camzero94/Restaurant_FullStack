"""Create Item and Recipe table

Revision ID: 1120bd20f057
Revises: ee6495e1f5e1
Create Date: 2022-08-15 17:16:25.134828

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = '1120bd20f057'
down_revision = 'ee6495e1f5e1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "Item",
        sa.Column("itemId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("nameItem", sa.String(50), nullable=False),
        sa.Column("quantity", sa.Integer),
        sa.Column("unit", sa.String(10)),
        sa.Column("price", sa.Float),
        sa.Column("type", sa.String),
        sa.Column("cooking",sa.Boolean),
        sa.Column("summary", sa.String(200)),
        sa.Column("image_url",sa.String(100),nullable=False),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("projectId",sa.Integer, ForeignKey("Project.projectId"))
    ),
    op.create_table(
        "Recipe",
        sa.Column("itemId",sa.Integer,ForeignKey("Item.itemId"), primary_key=True),
        sa.Column("ingredientId",sa.Integer,ForeignKey("Ingredient.ingredientId"), primary_key=True),
        sa.Column("quantity",sa.Float,nullable=False),
        sa.Column("unit",sa.String,nullable=False),
        sa.Column("instructions",sa.String),
    )
    pass


def downgrade():
    op.drop_table('Recipe'),
    op.drop_table('Item'),
    pass
