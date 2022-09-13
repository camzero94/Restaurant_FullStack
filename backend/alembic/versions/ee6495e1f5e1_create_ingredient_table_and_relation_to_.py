"""create Ingredient table and relation to project

Revision ID: ee6495e1f5e1
Revises: 68e4cb0f5075
Create Date: 2022-08-14 15:29:03.708360

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = 'ee6495e1f5e1'
down_revision = '68e4cb0f5075'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "Ingredient",
        sa.Column("ingredientId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("nameIngredient", sa.String(50), nullable=False),
        sa.Column("quantity", sa.Integer),
        sa.Column("unit", sa.String(10)),
        sa.Column("summary", sa.String(200)),
        sa.Column("image_url",sa.String(100),nullable=False),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("projectId",sa.Integer, ForeignKey("Project.projectId"))
    ),
    pass


def downgrade():
    op.drop_table('Ingredient')
    pass
