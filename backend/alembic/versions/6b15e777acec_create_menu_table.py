"""create Menu Table

Revision ID: 6b15e777acec
Revises: 1120bd20f057
Create Date: 2022-12-11 11:36:03.110069

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = '6b15e777acec'
down_revision = '1120bd20f057'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "Menu",
        sa.Column("menuId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("nameMenu", sa.String(50), nullable=False),
        sa.Column("description", sa.String(100)),
        sa.Column("type", sa.String),
        sa.Column("is_active",sa.Boolean),
        sa.Column("summary", sa.String(200)),
        sa.Column("image_url",sa.String(100),nullable=False),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("projectId",sa.Integer, ForeignKey("Project.projectId"))
    ),
    op.create_table(
        "MenuItem",
        sa.Column("menuId",sa.Integer,ForeignKey("Menu.menuId"), primary_key=True),
        sa.Column("itemId",sa.Integer,ForeignKey("Item.itemId"), primary_key=True),
    )
    pass


def downgrade():
    op.drop_table('MenuItem'),
    op.drop_table('Menu'),
    pass
